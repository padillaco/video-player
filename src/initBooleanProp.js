export default function initBooleanProp(config, prop, defaultValue) {
  if (prop in config) {
    return config[prop];
  }
  return defaultValue;
}
