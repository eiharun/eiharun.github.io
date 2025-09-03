// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "projects",
          description: "My Projects!",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "My Repositories",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "nav-resume",
          title: "resume",
          description: "You can download my resume here -&gt;",
          section: "Navigation",
          handler: () => {
            window.location.href = "/resume/";
          },
        },{id: "projects-high-altitude-balloon-venting-system",
          title: 'High Altitude Balloon Venting System',
          description: "VT Senior Design Project [SP25-20]",
          section: "Projects",handler: () => {
              window.location.href = "/projects/hab/";
            },},{id: "projects-microflipper",
          title: 'MicroFlipper',
          description: "microcontroller based Flipper-Zero (attempt)",
          section: "Projects",handler: () => {
              window.location.href = "/projects/microflipper/";
            },},{id: "projects-pinguos",
          title: 'PinguOs',
          description: "Learning to write my own operating system",
          section: "Projects",handler: () => {
              window.location.href = "/projects/pinguos/";
            },},{id: "projects-raytracer",
          title: 'RayTracer',
          description: "Learning raytracing project",
          section: "Projects",handler: () => {
              window.location.href = "/projects/raytracer/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%68%61%72%75%6E%61%64%69%79%61%6D%61%6E@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/eiharun", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/ieharun", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
