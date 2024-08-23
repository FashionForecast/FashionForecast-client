import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import {  Avatar, Paper } from '@mui/material';

//paper

export const WeatherCardWrapper = styled(Paper)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 16px 32px;
    background-color: ${colors.blueGrey[100]};
    border-radius: 16px;
    elevation: 0;
`
export const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 33.3333%;
    height: 100%;
    padding: 8px 0;
    border-right: 1px solid #f1f1f1;

    &:last-child {
        border-right: none;
    }
`



export const WeatherIcon = styled(Avatar)`
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-bottom: 8px;
    background-color: #fff;
`

export const WeatherHeader = styled.div`
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    color: ${colors.blueGrey[900]};
    text-align: center;
    letter-spacing: 0.15px;
    opacity: 0.87;    


`

export const WeatherSubheader = styled.div`
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: ${colors.blueGrey[900]};
    opacity: 0.6;
`