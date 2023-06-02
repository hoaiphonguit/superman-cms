import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Avatar, IconButton, styled } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography, { typographyClasses } from '@mui/material/Typography';
import { Box } from '@mui/system';
import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';
import ContentService from 'src/modules/content/service';

const StyledBoxThumbNote = styled(Box)(({ theme }) => ({
    alignIitems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px dashed rgb(45, 55, 72)',
    borderRadius: '8px',
    padding: '24px',
    [`.${typographyClasses.root}`]: {
        fontSize: '1rem',
        color: theme.palette.grey[600],
    },
}));

const StyledRemoveThumbButton = styled(IconButton)(({ theme }) => ({
    borderRadius: '100%',
    position: 'absolute',
    top: -10,
    right: -14,
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    ':hover': {
        backgroundColor: '#ffffff',
    },
}));

export interface IImageUploadProps {
    thumbUrl: string;
}

const ImageUpload = ({ thumbUrl }: IImageUploadProps) => {
    const [thumbUrlState, setThumb] = useState<string>(thumbUrl);
    const hiddenFileInputRef = useRef<HTMLInputElement>(null);

    const handleClick = (event) => {
        hiddenFileInputRef.current?.click();
    };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const _file = e.target.files[0];
            console.log('file', e.target.files[0]);
            const resp = await ContentService.uploadImage(_file);
            if (resp.success) {
                setThumb(resp.image?.url);
            }
        }
    };

    useEffect(() => {
        setThumb(thumbUrl);
    }, [thumbUrl]);

    const onRemoveThumb = () => {
        setThumb('');
    };

    console.log('thumbUrlState', thumbUrlState);

    return (
        <Card sx={{ maxWidth: '100%', boxShadow: 'none', overflow: 'visible' }}>
            <Box sx={{ position: 'relative' }}>
                {thumbUrlState && (
                    <>
                        <CardMedia
                            sx={{
                                height: 140,
                                borderRadius: 1,
                            }}
                            image={thumbUrlState}
                        ></CardMedia>
                        <StyledRemoveThumbButton
                            aria-label="delete"
                            size="small"
                            onClick={onRemoveThumb}
                        >
                            <ClearIcon fontSize="inherit" />
                        </StyledRemoveThumbButton>
                    </>
                )}
                {!thumbUrlState && (
                    <StyledBoxThumbNote
                        sx={{
                            textAlign: 'center',
                            height: 140,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Chọn một ảnh thumbnail
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Ảnh được sử dụng để làm thumbnail và open graph meta
                        </Typography>
                    </StyledBoxThumbNote>
                )}
            </Box>
            <StyledBoxThumbNote
                sx={{
                    mt: 2,
                    cursor: 'pointer',
                    flexDirection: 'row',
                    alignItems: 'center',
                    '&:hover': {
                        backgroundColor: 'rgba(243, 244, 246, 0.04)',
                        cursor: 'pointer',
                        opacity: 0.5,
                    },
                }}
                onClick={handleClick}
            >
                <input
                    accept="image/*"
                    type="file"
                    ref={hiddenFileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                <Avatar sx={{ width: 64, height: 64 }}>
                    <CloudUploadIcon />
                </Avatar>
                <Box sx={{ ml: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        <span>Bấm để tải lên</span> hoặc kéo thả
                    </Typography>
                    <Typography>
                        (SVG, JPG, PNG, or gif maximum 900x400)
                    </Typography>
                </Box>
            </StyledBoxThumbNote>
        </Card>
    );
};

export default memo(ImageUpload);
