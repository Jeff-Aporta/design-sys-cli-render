function App() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper className="pad-10px m-30px">
          <h1>En Contstrucción</h1>
        </Paper>
      </ThemeProvider>
    );
  }
  
  ReactDOM.render(<App />, document.getElementById("root"));
  