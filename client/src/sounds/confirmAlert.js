export function optionsFn(setState) {
  return {
    title: "Can I play background music",
    message: "You can always change the setting",
    buttons: [
      {
        label: "yes",
        onClick: () => setState(false),
      },
      {
        label: "No",
        onClick: () => null,
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypress: () => {},
    onKeypressEscape: () => {},
    overlayClassName: "overlay-custom-class-name",
  };
}
