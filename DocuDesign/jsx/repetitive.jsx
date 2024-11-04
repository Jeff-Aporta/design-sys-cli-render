console.log("repetitive load")

function $index(props) {
  return (
    <$ {...props} id={idR()} className={`${props.className} indexed md`} />
  );
}
