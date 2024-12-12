import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import ModalToolbar from "../../components/ModalToolbar";
import { useNavigate } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import { Project, ProjectStatus } from "../../models/Project";

const ProjectDetailsEditView = () => {
  const navigate = useNavigate();

  const project: Project = {
    title: "Project 1",
    description: "TODO",
    status: ProjectStatus.InProgress
  };

  return (
    <>
      <ModalToolbar
        title={project.title}
        backPath="/dashboard/details"
        actionButton={
          <IconButton onClick={() => navigate("/dashboard")} aria-label="close">
            <CloseIcon />
          </IconButton>
        }
      />

      <Stack sx={{ mx: 3, mb: 3 }} spacing={2}>
        <TextField label="Title" />

        <FormControl fullWidth>
          <InputLabel id="categoryLabel">Category</InputLabel>
          <Select label="Category" labelId="categoryLabel">
            {(
              Object.keys(ProjectStatus) as Array<keyof typeof ProjectStatus>
            ).map((key) => (
              <MenuItem value={key} key={key}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField label="Description" />

        <Button
          variant="contained"
          onClick={() => {
            console.log("Project details saved");
            navigate("/dashboard/details");
          }}
        >
          Save project details
        </Button>
      </Stack>
    </>
  );
};

export default ProjectDetailsEditView;
