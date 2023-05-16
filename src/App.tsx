import React, {useState} from 'react';
import { Drawer, Box, Button, Input, Portal} from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ProTip from './ProTip';
import {useKeyboardContext} from "./keyboard";
import KeyboardInput from './KeyboardInput';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}

export default function App() {
    const {isKeyboardVisible, setKeyboardVisible} = useKeyboardContext();
    const [isDrawerVisible, setDrawerVisible] = useState<boolean>(false);
    const [inputVal, setInputVal] = useState('');
    return (

        <Container maxWidth="sm">
            <Box sx={{my: 4}}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Material UI Create React App example in TypeScript
                </Typography>
                <ProTip/>
                <Copyright/>
            </Box>
            <Button onClick={() => {
                setDrawerVisible(true);
            }}>Open Drawer</Button>
            <Drawer
                variant="persistent"
                anchor="bottom"
                open={isDrawerVisible}
                onClose={setDrawerVisible}
            >
                <Button onClick={() => {
                    setDrawerVisible(false);
                }}>
                    Close Drawer
                </Button>
                <Input
                    placeholder={'test'}
                    value={inputVal}
                    disableUnderline
                    autoFocus={false}
                    fullWidth
                    onFocus={() => setKeyboardVisible(true)}
                />
                {
                    isKeyboardVisible && <Box height="260px" width="100%" />
                }
            </Drawer>
            <Portal container={document.querySelector('.virtual-keyboard')}>
                <KeyboardInput
                    value={inputVal}
                    onChangeInput={(e) => {
                        setInputVal(e);
                    }}
                />
            </Portal>
        </Container>
    );
}
