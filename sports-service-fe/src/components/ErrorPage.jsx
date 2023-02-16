import React, { useState } from "react";
import {Stack, styled, TextField, Typography } from "@mui/material";

export const StyledStack = styled(Stack)(({theme})=>({
    alignItems: 'center',
}));

export const ErrorPage = () =>  (
        <StyledStack spacing={2} justifyContent="center" alignItems={"center"}>
            <Typography variant="h2" component={"h4"} color="primary">Oops!!!</Typography>
            <Typography variant="h2" component={"h4"} color={"secondary"}> Sorry, Page not found</Typography>
        </StyledStack>
    );