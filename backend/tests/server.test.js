const request = require("supertest");
const app = require("../server");
const List = require("../models/List");

// Aucun accès à une vraie base : le modèle List est simulé.
afterEach(() => {
  jest.restoreAllMocks();
});

describe("GET /api/lists", () => {
  it("retourne les tâches", async () => {
    const taches = [{ title: "Déployer", body: "Configurer Render" }];
    jest.spyOn(List, "find").mockResolvedValue(taches);

    const res = await request(app).get("/api/lists");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(taches);
  });

  it("renvoie 500 sans exposer l'erreur interne", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(List, "find").mockRejectedValue(new Error("détail interne"));

    const res = await request(app).get("/api/lists");

    expect(res.status).toBe(500);
    expect(res.body.error).not.toContain("détail interne");
  });
});

describe("Routes du frontend", () => {
  it("répond sur une route quelconque sans planter (catch-all Express 5)", async () => {
    const res = await request(app).get("/une/page/quelconque");

    // 200 si frontend/build existe, 404 avec message clair sinon
    expect([200, 404]).toContain(res.status);
    expect(res.text).not.toMatch(/ENOENT|at .*\.js/);
  });
});
