import Grid from "@mui/material/Grid";
import TodoInside from "./TodoInside";

function TodoWidget() {
  return (
    <div>
      <div>
        <h1
          style={{

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Todo List
        </h1>
        <p
          id="description"
          className="blackLetter"
          style={{ }}
        >
          See what remains
        </p>
        <div >
          {" "}
          <Grid container spacing={2}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ minHeight: "30vh" }}
            >
              <TodoInside />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default TodoWidget;
