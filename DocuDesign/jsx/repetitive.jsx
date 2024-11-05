
function $CardDef(props) {
  let { title, children } = props;
  delete props.title;
  delete props.children;
  if (typeof title == "string") {
    title = <$enfasis>{title}</$enfasis>;
  }
  return (
    <Card {...props} className="mh-20px pad-10px">
      {title}
      <br />
      <$F>{children}</$F>
    </Card>
  );
}

function $CardF(props) {
  return (
    <Card
      {...props}
      className={`${props.className ?? ""} pad-10px`}
      children={<$F>{props.children}</$F>}
    />
  );
}

function $index(props) {
  return (
    <$ {...props} id={idR()} className={`${props.className} indexed md`} />
  );
}

function $enfasis({ children }) {
  return <strong className="c-skyblue">{children}</strong>;
}

function $secundario({ children }) {
  return <span style={{ color: "steelblue" }}>{children}</span>;
}
