import { Box, Button, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { EventContext } from "../lib/Context";
import { ActionTypes } from "../lib/types";
import { updateEvent } from "../lib/api";


interface Inputs {
    title: string
    date: string
    time: string
    cover: string
    composer: string
    type: string
    id: string
}

export const EditEvent:React.FC = () => {
    const context = useContext(EventContext);
    if(!context) {
        throw new Error("Outside a provider...");
    }
    
    const {state, dispatch} = context;
    
    const formattedDate = new Date(state.currentEvent.date).toISOString().split('T')[0];

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
          title: state.currentEvent.title,
          date: formattedDate,
          time: state.currentEvent.time,
          composer: state.currentEvent.composer,
          cover: state.currentEvent.cover,
          type: state.currentEvent.type,
          id: state.currentEvent.id
        }
    });

    

    const handleAdd: SubmitHandler<Inputs> = (data) => {
        updateEvent(data)
        .then(res => {
            dispatch({ type: ActionTypes.open, payload: false })
            dispatch({ type: ActionTypes.updateEvent, payload: res });
            reset();
        })
        .catch((error) => {
            console.error("Failed to post event:", error);
        });
    }

 
 return <>
        <Box my={2}>
            <Modal open={state.open} onClose={() => dispatch({ type: ActionTypes.open, payload: true })}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    color: 'blue'
                }}>
                    <Typography variant="h6" mb={2}>Edit Event</Typography>
                    <form onSubmit={handleSubmit(handleAdd)}>
                        <Box my={2}>
                            <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                {...register("title", { required: "Title is required" })}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                        </Box>
                        <Box my={2}>
                            <TextField
                                label="Date"
                                type="date"
                                variant="outlined"
                                fullWidth
                                {...register("date", { required: "Date is required" })}
                                error={!!errors.date}
                                helperText={errors.date?.message}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>
                        <Box my={2}>
                            <TextField
                                label="Time"
                                type="time"
                                variant="outlined"
                                fullWidth
                                {...register("time", { required: "Time is required" })}
                                error={!!errors.time}
                                helperText={errors.time?.message}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>
                        <Box my={2}>
                            <TextField
                                label="Composer"
                                variant="outlined"
                                fullWidth
                                {...register("composer", { required: "Composer is required" })}
                                error={!!errors.composer}
                                helperText={errors.composer?.message}
                            />
                        </Box>
                        <Box my={2}>
                            <TextField
                                label="Cover"
                                variant="outlined"
                                fullWidth
                                {...register("cover", { required: "Cover is required" })}
                                error={!!errors.cover}
                                helperText={errors.cover?.message}
                            />
                        </Box>
                        <Box my={2}>
                            <Select
                                label="Type"
                                defaultValue={state.currentEvent.type}
                                fullWidth
                                {...register("type", { required: "Type is required" })}
                                error={!!errors.type}
                            >
                                <MenuItem value="opera">Opera</MenuItem>
                                <MenuItem value="ballet">Ballet</MenuItem>
                            </Select>
                            {errors.type && <Typography variant="body2" color="error">{errors.type.message}</Typography>}
                        </Box>
                        <Button variant="contained" type="submit" fullWidth>Submit</Button>
                    </form>
                </Box>
            </Modal>
        </Box>
    </>
}