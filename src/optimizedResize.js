(function() {
  var throttle = (type, name, obj) => {
    obj = obj || window;
    let running = false;
    const func = () => {
      if (running) return;
      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };

  throttle('resize', 'optimizedResize');
})();
