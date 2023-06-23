import { Building } from "../../types";
import { BuildingScene } from "./building-scene";

export const buildingHandler = {
  viewer: null as BuildingScene | null,

  async start(container: HTMLDivElement, building: Building) {
    if (!this.viewer) {
      this.viewer = new BuildingScene(container, building);
    }
  },

  remove() {
    if (this.viewer) {
      console.log("Removing building scene");

      this.viewer.dispose();
      this.viewer = null;
    }
  },

  async convertIfcToFragments(ifc: File) {
    if (!this.viewer) throw new Error("Viewer not initialized");

    return this.viewer.convertIfcToFragments(ifc);
  },

  async deleteModel(id: string) {
    if (this.viewer) {
      await this.viewer.database.deleteModel(id);
    }
  },
};
