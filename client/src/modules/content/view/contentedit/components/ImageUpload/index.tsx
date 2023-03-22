import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Avatar, IconButton, styled } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography, { typographyClasses } from '@mui/material/Typography';
import { Box } from '@mui/system';
import { ChangeEvent, memo, useState } from 'react';

const StyledBoxThumbNote = styled(Box)(({ theme }) => ({
    alignIitems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px dashed rgb(45, 55, 72)',
    borderRadius: '8px',
    height: '230px',
    padding: '24px',
    [`.${typographyClasses.root}`]: {
        fontSize: '1rem',
        color: theme.palette.grey[600],
        // textAlign: 'center',
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

const ImageUpload = () => {

    const [file, setFile] = useState<File>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    // 👇 Uploading the file using the fetch API to the server
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: file,
      // 👇 Set headers manually for single file upload
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`, // 👈 Headers need to be a string
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

    return (
        <Card sx={{ maxWidth: '100%', boxShadow: 'none', overflow: 'visible' }}>
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    sx={{
                        height: 140,
                        borderRadius: 1,
                    }}
                    image="http://localhost:5000/statics/images/light-liu.jpg"
                    title="green iguana"
                />
                <StyledRemoveThumbButton aria-label="delete" size="small">
                    <ClearIcon fontSize="inherit" />
                </StyledRemoveThumbButton>
            </Box>
            {/* <StyledBoxThumbNote>
                <Typography variant="h6" gutterBottom>
                    Chọn một ảnh thumbnail
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Ảnh được sử dụng để làm thumbnail và open graph meta
                </Typography>
            </StyledBoxThumbNote> */}
            <StyledBoxThumbNote
                sx={{
                    mt: 2,
                    cursor: 'pointer',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                onClick={handleUploadClick}
            >
                <input
                    accept="image/*"
                    type="file"
                    onChange={handleFileChange}
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
