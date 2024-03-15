

document.addEventListener("DOMContentLoaded", () => {
    let engine = Matter.Engine.create();
    let runner = Matter.Runner.create();
    let scene = document.querySelector(".scene");
    Matter.Runner.run(runner, engine);
    scene.width = 1000;  // Corrected "innerwidth" to "innerWidth"
    scene.height = 1000;  // Corrected "innerweight" to "innerHeight"
    let ctx = scene.getContext("2d");
    ctx.font = "38px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,.01";

    Matter.Composite.add(
      engine.world,
      Matter.Bodies.rectangle(1, scene.height - 10, 2000, 5, {
        isStatic: true,
      })
    );

    function createRandom() {
      let content = [ "😩", "💦", "💩"][
        Math.floor(Math.random() * 3)
      ];
      return Matter.Bodies.circle(scene.width / 2 - 10, scene.height / 2 - 10, 35, {
        density: 0.0005,
        frictionAir: 0.06,
        restitution: 0.3,
        friction: 0.01,
        bodyType: "emotion",
        content: content,
      });
    }

    function draw() {
      
      let bodies = Matter.Composite.allBodies(engine.world);


      ctx.fillStyle = "red";
      ctx.fillRect(1, 10, scene.width, scene.height);
      
      window.requestAnimationFrame(draw);
      
      for (let i = 0; i < bodies.length; i++) {
        let pos = bodies[i].position;
        
        ctx.fillStyle = "#bbf";
        if (bodies[i].bodyType === "emotion") {
          ctx.fillText(bodies[i].content, pos.x +50, pos.y + 5);
        } else {
          ctx.fillRect(pos.x, pos.y - 10, scene.width, scene.height);
        }
      }
    }
    document.querySelector(".surpriseMe").addEventListener("click", () => {
      let body = createRandom();
      Matter.Composite.add(engine.world, body);
      Matter.Body.setVelocity(body, { x: Math.random() > 0.5 ? 8 : -8, y: -10 });
    });

    draw();
  });
