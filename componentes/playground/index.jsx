function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper className="pad-10px m-30px">
        <h1>Necesita</h1>
        <$PR lang="js" src="fragments/p1.js"></$PR>
      </Paper>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
