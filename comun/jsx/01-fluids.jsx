function $hr(props) {
  return <hr {...props} className={$variatStr("hr", props)} />;
}

function $br(props) {
  return <br {...props} className={$variatStr("br", props)} />;
}

function $$br(props) {
  const br = <br {...props} className={$variatStr("br", props)} />;
  return (
    <_>
      {br}
      {br}
    </_>
  );
}

function $h1(props) {
  return <$ {...props} variant="h1" />;
}

function $h2(props) {
  return <$ {...props} variant="h2" />;
}
function $h3(props) {
  return <$ {...props} variant="h3" />;
}
function $h4(props) {
  return <$ {...props} variant="h4" />;
}
function $h5(props) {
  return <$ {...props} variant="h5" />;
}
function $h6(props) {
  return <$ {...props} variant="h6" />;
}
function $h7(props) {
  return <$ {...props} variant="h7" />;
}
function $h8(props) {
  return <$ {...props} variant="h8" />;
}
function $h9(props) {
  return <$ {...props} variant="h9" />;
}

function _(props) {
  if (Object.keys(props).length == 1 && props.children) {
    return <React.Fragment {...props} />;
  }
  return <div {...props} />;
}

function $(props) {
  return (
    <_
      {...props}
      className={
        ($variatStr(props.variant) ?? "") + " " + (props.className ?? "")
      }
    />
  );
}

function $variatStr(variant, props) {
  const { className = "" } = props ?? {};

  switch (variant) {
    case "hr":
      return fluidCSS()
        .ltX(500, { display: "none" })
        .end(props.className ?? "op-20");
    case "br":
      return fluidCSS().ltX(500, { display: "none" }).end(className);
  }
  const fs = 18;
  const max = 50;
  const min = 20;
  const lerp = (t, max, min) => (max - min) * t + min;
  const lerpH = (h) => lerp(1 - h / steps, max, min);
  const steps = 9;
  return (() => {
    const map = {
      h1: lerpH(1),
      h2: lerpH(2),
      h3: lerpH(3),
      h4: lerpH(4),
      h5: lerpH(5),
      h6: lerpH(6),
      h7: lerpH(7),
      h8: lerpH(8),
      h9: lerpH(9),
    };
    const sz = map[variant];
    if (sz) {
      return fluidCSS()
        .lerpX([400, 1000], {
          fontSize: [fs, sz],
        })
        .ltX(600, { fontWeight: "bolder" })
        .end(className + " c-white");
    }
    return "";
  })();
}
