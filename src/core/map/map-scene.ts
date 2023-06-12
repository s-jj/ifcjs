import * as OBC from "openbim-components";
import { MAPBOX_KEY } from "../../config";
import { GisParameters } from "../../types";
import * as MAPBOX from "mapbox-gl";
import * as THREE from "three";

export class MapScene {
	private components = new OBC.Components();
	private readonly style = "mapbox://styles/mapbox/light-v10";

	constructor(container: HTMLDivElement) {
		const configuration = this.getConfig(container);
		this.initializeComponents(configuration);
		this.setupScene();
	}

	dispose() {
		this.components.dispose();
		(this.components as any) = null;
	}

	private setupScene() {
		const scene = this.components.scene.get();
		scene.background = null;
		const dirLight1 = new THREE.DirectionalLight(0xffffff);
		dirLight1.position.set(0, -70, 100).normalize();
		scene.add(dirLight1);
		const dirLight2 = new THREE.DirectionalLight(0xffffff);
		dirLight2.position.set(0, 70, 100).normalize();
		scene.add(dirLight2);
	}

	private initializeComponents(config: GisParameters) {
		this.components.scene = new OBC.SimpleScene(this.components);
		this.components.camera = new OBC.MapboxCamera();
		this.components.renderer = this.createRenderer(config);
		this.components.init();
	}

	private createRenderer(config: GisParameters) {
		const map = this.createMap(config);
		const coords = this.getCoordinates(config);
		return new OBC.MapboxRenderer(this.components, map, coords);
	}

	private createMap(config: GisParameters) {
		return new MAPBOX.Map({
			...config,
			style: this.style,
			antialias: true,
		});
	}

	private getCoordinates(config: GisParameters) {
		const merc = MAPBOX.MercatorCoordinate.fromLngLat(config.center, 0);
		return merc;
	}

	private getConfig(container: HTMLDivElement) {
		const center = [11.730277288470006, 55.510047455818375] as [
			number,
			number
		];
		return {
			container,
			accessToken: MAPBOX_KEY,
			zoom: 15,
			pitch: 60,
			bearing: -40,
			center,
			buildings: [],
		};
	}
}
