import { Text, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) =>({
    header: {
        backgroundColor: theme.colors.blue[7],
        padding: theme.spacing.md,
        fontSize: theme.fontSizes.md,
        color: theme.colors.gray[0],
    }
}))

const Header = () => {

    const { classes } = useStyles();
    return(
    <>
        <header className={classes.header}>
            <Text>home</Text>
        </header>
    </>
    )
};

export default Header;