import './app';

export async function bootstrap() {
  console.log('app2 bootstraped');
}

export async function mount(props: any) { 
  console.log('app2 mounted');
}

export async function unmount() {
  console.log('app2 unmount');
}

export async function update(props: any) {
  console.log('app2 update', props);
}

(global => {
  global['purehtml'] = {
    bootstrap,
    mount,
    unmount,
  };
})(window);
