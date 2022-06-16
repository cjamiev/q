export const updateDependencyVersions = (packageJson, selectedDeps) => {
  const dependencies = packageJson.dependencies;
  const devDependencies = packageJson.devDependencies;

  const updatedDependencies = Object.keys(packageJson.dependencies)
    .map(name => {
      const matched = selectedDeps.find(dep => !!dep[name]);
      if(matched) {
        return { [name]: matched[name] };
      }

      return { [name]: packageJson.dependencies[name] };
    })
    .reduce((acc, item) => ({...acc,...item}));
  const updatedDevDependencies = Object.keys(packageJson.devDependencies)
    .map(name => {
      const matched = selectedDeps.find(dep => !!dep[name]);
      if(matched) {
        return { [name]: matched[name] };
      }

      return { [name]: packageJson.devDependencies[name] };
    })
    .reduce((acc, item) => ({...acc,...item}));

  return {
    ...packageJson,
    devDependencies: updatedDevDependencies,
    dependencies: updatedDependencies
  };
};