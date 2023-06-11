import { Application, Sprite, Assets } from 'pixi.js';
import samplePng from './sample.png';

console.log(samplePng);

const app = new Application();

document.body.appendChild(app.view as any);

(async () => {
  const texture = await Assets.load(samplePng);
  const bunny = new Sprite(texture);

  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;

  bunny.anchor.x = 0.5;
  bunny.anchor.y = 0.5;

  app.stage.addChild(bunny);

  app.ticker.add(() => {
    bunny.rotation += 0.01;
  });
})();
