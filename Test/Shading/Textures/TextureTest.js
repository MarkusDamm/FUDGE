var TextureTest;
(function (TextureTest) {
    var ƒ = FudgeCore;
    ƒ.RenderManager.initialize(true, true);
    window.addEventListener("load", init);
    function init(_event) {
        let img = document.querySelector("img");
        let txtImage = new ƒ.TextureImage();
        txtImage.image = img;
        let coatTextured = new ƒ.CoatTextured();
        coatTextured.texture = txtImage;
        // let coatColored: ƒ.CoatColored = new ƒ.CoatColored(new ƒ.Color(1, 0, 0, 1));
        let material = new ƒ.Material("Textured", ƒ.ShaderTexture, coatTextured);
        let quad = Scenes.createCompleteMeshNode("Quad", material, new ƒ.MeshQuad());
        let cube = Scenes.createCompleteMeshNode("Cube", material, new ƒ.MeshCube());
        let pyramid = Scenes.createCompleteMeshNode("Pyramid", material, new ƒ.MeshPyramid());
        cube.cmpTransform.local.translateX(0.7);
        // cube.cmpTransform.rotateX(-45);
        cube.cmpTransform.local.rotateY(-45);
        pyramid.cmpTransform.local.translateX(-0.7);
        let branch = new ƒ.Node("Branch");
        branch.addChild(quad);
        branch.addChild(cube);
        branch.addChild(pyramid);
        let viewport = new ƒ.Viewport();
        let cmpCamera = Scenes.createCamera(new ƒ.Vector3(0, 2, 3), new ƒ.Vector3(0, 0, 0));
        viewport.initialize("Viewport", branch, cmpCamera, document.querySelector("canvas"));
        viewport.draw();
        window.setInterval(function () {
            pyramid.cmpTransform.local.rotateX(1);
            cube.cmpTransform.local.rotateY(-1);
            quad.cmpTransform.local.rotateZ(1);
            viewport.draw();
        }, 20);
    }
})(TextureTest || (TextureTest = {}));
//# sourceMappingURL=TextureTest.js.map