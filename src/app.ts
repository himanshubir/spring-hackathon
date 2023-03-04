import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/loaders/glTF";
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, Mesh, MeshBuilder, StandardMaterial, Color3 } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button,  } from '@babylonjs/gui/2D';

class App {
    constructor() {
        // create the canvas html element and attach it to the webpage
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.id = "gameCanvas";
        document.body.appendChild(canvas);

        // initialize babylon scene and engine

        var engine = new Engine(canvas, true);
        var scene = new Scene(engine);

                

        var camera: ArcRotateCamera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene);
        // Limit how far the camera can zoom in and out
        camera.lowerRadiusLimit = 3;
        camera.upperRadiusLimit = 10;

        camera.attachControl(canvas, true);


        var light1: HemisphericLight = new HemisphericLight("light1", new Vector3(1, 1, 0), scene);
        var sphere: Mesh = MeshBuilder.CreateSphere("sphere", { diameter: 1 }, scene);
        
        // Create a button that says click me
        var button = MeshBuilder.CreatePlane("button", { width: 1, height: 1 }, scene);
        button.position.y = 0.5;
        button.position.z = 1.5;
        button.rotation.y = Math.PI;
        var advancedTexture = AdvancedDynamicTexture.CreateForMesh(button);
        var button1 = Button.CreateSimpleButton("but1", "Click Me");
        button1.width = 0.5;
        button1.height = "40px";
        button1.color = "white";
        button1.background = "green";
        advancedTexture.addControl(button1);

        // When the button is clicked, change the color of the sphere
        button1.onPointerUpObservable.add(() => {
            var material = new StandardMaterial("red", scene);
            material.diffuseColor = new Color3(1, 0, 0);
            sphere.material = material;
        });


        // hide/show the Inspector
        window.addEventListener("keydown", (ev) => {
            // Shift+Ctrl+Alt+I
            if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === 'i') {
                if (scene.debugLayer.isVisible()) {
                    scene.debugLayer.hide();
                } else {
                    scene.debugLayer.show();
                }
            }
        });

        // run the main render loop
        engine.runRenderLoop(() => {
            scene.render();
        });
    }
}
new App();