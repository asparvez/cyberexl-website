// js/main.js
(function() {
  // ---------- Binary Matrix Rain (0 and 1) - FIXED VISIBILITY ----------
  const matrixCanvas = document.getElementById('matrix-canvas');
  if (matrixCanvas) {
    const ctx = matrixCanvas.getContext('2d');
    let width, height, columns, drops;
    const chars = "01";
    function initMatrix() {
      width = window.innerWidth;
      height = window.innerHeight;
      matrixCanvas.width = width;
      matrixCanvas.height = height;
      const fontSize = 20;
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) drops[i] = Math.floor(Math.random() * -height / fontSize);
    }
    function drawMatrix() {
      ctx.fillStyle = 'rgba(5, 10, 20, 0.1)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#00e5ff';
      ctx.font = 'bold 20px "Courier New", monospace';
      const fontSize = 20;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);
        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }
    initMatrix();
    setInterval(drawMatrix, 70);
    window.addEventListener('resize', initMatrix);
  }

  // ---------- Three.js Background Network ----------
  const bgContainer = document.getElementById('bg-canvas');
  if (bgContainer) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 25;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    bgContainer.appendChild(renderer.domElement);
    const particlesGeo = new THREE.BufferGeometry();
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i+=3) {
      pos[i] = (Math.random() - 0.5) * 60;
      pos[i+1] = (Math.random() - 0.5) * 40;
      pos[i+2] = (Math.random() - 0.5) * 60;
    }
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x1e6df2, size: 0.05, transparent: true, blending: THREE.AdditiveBlending });
    const particles = new THREE.Points(particlesGeo, pMat);
    scene.add(particles);
    function bgAnimate() {
      requestAnimationFrame(bgAnimate);
      particles.rotation.y += 0.0008;
      renderer.render(scene, camera);
    }
    bgAnimate();
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  // ---------- Fade-up Observer ----------
  const fadeElements = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  fadeElements.forEach(el => observer.observe(el));

  // ---------- Mobile Menu ----------
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = '#050a14';
        navLinks.style.padding = '24px';
        navLinks.style.backdropFilter = 'blur(20px)';
        navLinks.style.borderBottom = '1px solid #00e5ff30';
        navLinks.style.zIndex = '99';
      }
    });
  }

  // ---------- Smooth Scroll ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (navLinks && navLinks.style.display === 'flex') navLinks.style.display = 'none';
      }
    });
  });

  // ---------- Contact Form ----------
  const form = document.getElementById('contactForm');
  if (form) {
    const feedback = document.getElementById('formFeedback');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      if (!name || !email) {
        feedback.textContent = 'Please fill in required fields.';
        feedback.className = 'form-message error';
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        feedback.textContent = 'Please enter a valid email address.';
        feedback.className = 'form-message error';
        return;
      }
      feedback.textContent = '✓ Request received! A CyberExL specialist will contact you shortly.';
      feedback.className = 'form-message success';
      form.reset();
    });
  }

  // ---------- Three.js Rotating Cybersecurity Shield (Homepage) - IMPROVED VISIBILITY ----------
  if (document.getElementById('hero-canvas')) {
    const heroCanvas = document.getElementById('hero-canvas');
    const hScene = new THREE.Scene();
    hScene.background = null;
    const hCamera = new THREE.PerspectiveCamera(45, (window.innerWidth * 0.5) / window.innerHeight, 0.1, 1000);
    hCamera.position.set(0, 1.5, 8);
    const hRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    hRenderer.setSize(window.innerWidth * 0.5, window.innerHeight);
    hRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    heroCanvas.appendChild(hRenderer.domElement);

    // Lighting - brighter for better visibility
    hScene.add(new THREE.AmbientLight(0x2a4a6a));
    const light1 = new THREE.PointLight(0x00e5ff, 1.5, 20);
    light1.position.set(5, 6, 5);
    hScene.add(light1);
    const light2 = new THREE.PointLight(0x1e6df2, 1.2, 20);
    light2.position.set(-5, 3, 6);
    hScene.add(light2);
    const light3 = new THREE.PointLight(0x00e5ff, 0.8, 15);
    light3.position.set(2, -2, 8);
    hScene.add(light3);

    const mainGroup = new THREE.Group();
    hScene.add(mainGroup);

    // --- CLASSIC SHIELD SHAPE (Larger) ---
    const shieldGroup = new THREE.Group();

    const shape = new THREE.Shape();
    shape.moveTo(0, 2.0);
    shape.lineTo(2.0, 1.2);
    shape.bezierCurveTo(2.8, 0.6, 2.5, -0.6, 2.0, -1.2);
    shape.lineTo(0, -2.4);
    shape.lineTo(-2.0, -1.2);
    shape.bezierCurveTo(-2.5, -0.6, -2.8, 0.6, -2.0, 1.2);
    shape.lineTo(0, 2.0);

    const extrudeSettings = {
      steps: 1,
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.15,
      bevelSize: 0.15,
      bevelSegments: 3
    };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x1a3a6e, 
      emissive: new THREE.Color(0x0a1a3a),
      roughness: 0.3,
      metalness: 0.2,
      transparent: true,
      opacity: 0.95
    });
    const shieldMesh = new THREE.Mesh(geometry, material);
    shieldMesh.rotation.y = -0.1;
    shieldMesh.rotation.x = 0.1;
    shieldMesh.position.y = -0.1;
    shieldGroup.add(shieldMesh);

    // Glowing Border
    const wireframeMat = new THREE.MeshStandardMaterial({ 
      color: 0x00e5ff, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.5,
      emissive: new THREE.Color(0x0088aa)
    });
    const wireframeShield = new THREE.Mesh(geometry, wireframeMat);
    wireframeShield.rotation.y = -0.1;
    wireframeShield.rotation.x = 0.1;
    wireframeShield.position.y = -0.1;
    shieldGroup.add(wireframeShield);

    // Inner glowing ring
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.06, 16, 64), new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: new THREE.Color(0x004466) }));
    ring.rotation.x = Math.PI / 2;
    ring.rotation.z = 0.2;
    ring.position.z = 0.2;
    shieldGroup.add(ring);

    // --- PROMINENT LOCK ICON ---
    const lockGroup = new THREE.Group();
    const lockBody = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.2, 0.8), new THREE.MeshStandardMaterial({ color: 0xd0d0d0, emissive: new THREE.Color(0x335577), roughness: 0.3, metalness: 0.7 }));
    lockBody.position.y = 0.0;
    lockGroup.add(lockBody);
    const keyhole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.2, 8), new THREE.MeshStandardMaterial({ color: 0x000000 }));
    keyhole.rotation.x = Math.PI / 2;
    keyhole.position.set(0, 0.1, 0.41);
    lockGroup.add(keyhole);
    const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.12, 8, 24, Math.PI), new THREE.MeshStandardMaterial({ color: 0xeeeeee, emissive: new THREE.Color(0x4477aa), roughness: 0.2, metalness: 0.8 }));
    shackle.rotation.y = 0.2;
    shackle.rotation.x = 0.3;
    shackle.position.y = 0.8;
    shackle.position.z = 0.1;
    lockGroup.add(shackle);
    
    lockGroup.position.z = 0.35;
    lockGroup.position.y = 0.1;
    shieldGroup.add(lockGroup);

    // --- BINARY CODE SPRITES (0 and 1) ---
    const particleCount = 400;
    const particleGroup = new THREE.Group();
    const canvas = document.createElement('canvas');
    const ctx2 = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx2.fillStyle = '#00e5ff';
    ctx2.font = 'bold 20px "Courier New", monospace';
    ctx2.textAlign = 'center';
    ctx2.textBaseline = 'middle';
    
    for (let i = 0; i < particleCount; i++) {
      ctx2.clearRect(0, 0, 32, 32);
      const char = Math.random() > 0.5 ? '0' : '1';
      ctx2.fillText(char, 16, 16);
      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(material);
      
      const radius = 3.0 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      sprite.position.x = radius * Math.sin(phi) * Math.cos(theta);
      sprite.position.y = radius * Math.sin(phi) * Math.sin(theta);
      sprite.position.z = radius * Math.cos(phi);
      
      sprite.scale.set(0.35, 0.35, 1);
      particleGroup.add(sprite);
    }
    shieldGroup.add(particleGroup);

    // Additional rings
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.04, 8, 64), new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: new THREE.Color(0x004466) }));
    ring2.rotation.x = Math.PI / 2;
    ring2.rotation.z = 0.5;
    shieldGroup.add(ring2);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.03, 8, 64), new THREE.MeshStandardMaterial({ color: 0x1e6df2 }));
    ring3.rotation.z = 0.8;
    ring3.rotation.x = 0.9;
    shieldGroup.add(ring3);

    mainGroup.add(shieldGroup);

    // Hand reaching (wireframe)
    const handGroup = new THREE.Group();
    const palm = new THREE.Mesh(new THREE.SphereGeometry(0.7, 5, 4), new THREE.MeshStandardMaterial({ color: 0x00aaff, wireframe: true }));
    palm.position.set(3.2, 0.3, 0.5);
    handGroup.add(palm);
    const fMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, wireframe: true });
    for (let i = 0; i < 3; i++) {
      const f = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.9), fMat);
      f.position.set(3.6 + i*0.2, 0.9 + i*0.1, 0.9);
      f.rotation.z = -0.1;
      handGroup.add(f);
    }
    mainGroup.add(handGroup);

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const starPos = [];
    for (let i = 0; i < 1000; i++) {
      const r = 5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos.push(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xaaccff, size: 0.03 }));
    hScene.add(stars);

    // Animation Loop
    let clock = new THREE.Clock();
    function heroAnimate() {
      requestAnimationFrame(heroAnimate);
      const time = performance.now() * 0.001;
      
      mainGroup.rotation.y += 0.004;
      
      shieldGroup.rotation.x = Math.sin(time * 0.3) * 0.04;
      shieldGroup.rotation.z = Math.sin(time * 0.2) * 0.03;
      
      particleGroup.rotation.y += 0.008;
      particleGroup.rotation.x += 0.003;
      
      wireframeShield.material.opacity = 0.4 + Math.sin(time * 5) * 0.2;
      
      handGroup.position.x = 3.2 + Math.sin(time * 1.5) * 0.15;
      
      stars.rotation.y -= 0.0005;
      hRenderer.render(hScene, hCamera);
    }
    heroAnimate();

    window.addEventListener('resize', () => {
      hRenderer.setSize(window.innerWidth * 0.5, window.innerHeight);
      hCamera.aspect = (window.innerWidth * 0.5) / window.innerHeight;
      hCamera.updateProjectionMatrix();
    });
  }
})();