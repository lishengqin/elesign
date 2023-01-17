const camelizeRE = /-(\w)/g;
export function withInstall(options) {
  options.install = app => {
    let name = options.name || options._name;
    app.component(
      `-${name}`.replace(camelizeRE, (_, c) => c.toUpperCase()),
      options
    );
  };
  return options;
}
