import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TreeItem, { treeItemClasses, TreeItemProps } from '@mui/lab/TreeItem';
import TreeView from '@mui/lab/TreeView';
import { Icon } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useAsync } from 'react-use';
import { INavigator } from 'src/interfaces';
import AppService from '../../service';

declare module 'react' {
    interface CSSProperties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}

type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
    color?: string;
    icon?: string;
    labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme}) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)',
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

function StyledTreeItem(props: StyledTreeItemProps) {
    const { bgColor, color, icon, labelText, ...other } = props;

    return (
        <StyledTreeItemRoot
            label={
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 0.5,
                        pr: 0,
                    }}
                >
                    {icon && (
                        <Box
                            component={(iconProps) => (
                                <Icon {...iconProps}>{icon}</Icon>
                            )}
                            color="inherit"
                            sx={{ mr: 1 }}
                        />
                    )}
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: 'inherit',
                            flexGrow: 1,
                            textTransform: 'capitalize',
                        }}
                    >
                        {labelText}
                    </Typography>
                </Box>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            {...other}
        />
    );
}

const NavigationListView = () => {
    const state = useAsync(AppService.appConfig);
    const list: INavigator[] =
        state.value?.list?.sort((a, b) => (a?.order || 0) - (b?.order || 0)) ||
        [];

    const renderTree = (navigator: INavigator) => (
        <StyledTreeItem
            key={navigator._id}
            nodeId={navigator._id}
            labelText={navigator.name}
            icon={navigator.icon}
        >
            {Array.isArray(navigator.children)
                ? navigator.children.map((child) => renderTree(child))
                : null}
        </StyledTreeItem>
    );

    return (
        <Grid item xs={12}>
            {list.length > 0 && (
                <TreeView
                    defaultExpanded={list?.map((navigator) => navigator._id)}
                    defaultCollapseIcon={<ArrowDropDownIcon />}
                    defaultExpandIcon={<ArrowRightIcon />}
                    sx={{
                        height: 264,
                        flexGrow: 1,
                        maxWidth: 300,
                        overflowY: 'auto',
                    }}
                >
                    {list.map((navigator) => renderTree(navigator))}
                </TreeView>
            )}
        </Grid>
    );
};

export default memo(NavigationListView);
