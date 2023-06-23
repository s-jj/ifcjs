import { getApp } from "firebase/app";
import { Building } from "../../types";
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
} from "firebase/storage";
import { ModelDatabase } from "./dexie-utils";

export class BuildingDatabase {
  private db: ModelDatabase;

  constructor() {
    this.db = new ModelDatabase();
  }

  async getModels(building: Building) {
    const urls: string[] = [];

    try {
      await this.db.open();
      const appInstance = getApp();
      const instance = getStorage(appInstance);

      for (const model of building.models) {
        const url = await this.getModelUrl(instance, model.id);
        urls.push(url);
      }
    } finally {
      this.db.close();
      return urls;
    }
  }

  private async getModelUrl(instance: FirebaseStorage, id: string) {
    if (this.isModelCached(id)) {
      return this.getModelFromLocalCache(id);
    }

    return this.getModelFromFirebase(instance, id);
  }

  private async getModelFromFirebase(instance: FirebaseStorage, id: string) {
    const fileRef = ref(instance, id);
    const fileUrl = await getDownloadURL(fileRef);
    await this.cacheModel(id, fileUrl);
    console.log("Got model from firebase and cached it");

    return fileUrl;
  }

  private async getModelFromLocalCache(id: string) {
    const found = await this.db.models.where("id").equals(id).toArray();
    const file = found[0].file;
    console.log("Got model from local cache");
    return URL.createObjectURL(file);
  }

  private async cacheModel(id: string, url: string) {
    const time = performance.now().toString();
    localStorage.setItem(id, time);
    const rawData = await fetch(url);
    const file = await rawData.blob();
    await this.db.models.add({
      id,
      file,
    });
  }

  async clearCache(building: Building) {
    await this.db.open();
    for (const model of building.models) {
      localStorage.removeItem(model.id);
    }
    await this.db.delete();
    this.db = new ModelDatabase();
    this.db.close();
  }

  async deleteModel(id: string) {
    await this.db.open();
    if (this.isModelCached(id)) {
      localStorage.removeItem(id);
      await this.db.models.where("id").equals(id).delete();
    }
    this.db.close();
  }

  private isModelCached(id: string) {
    const stored = localStorage.getItem(id);
    return stored! != null;
  }
}
