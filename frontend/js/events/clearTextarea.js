export function handleClear({ appDescription }) {
  return function () {
    appDescription.value = "";
  };
}
