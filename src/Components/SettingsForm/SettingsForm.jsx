import { IconSettings } from "@tabler/icons";
import { createStyles, Grid, Card, Text } from '@mantine/core';
import { ThemeContext } from '@emotion/react';

const useStyles = createStyles((theme) => ({
    h1: {
        backgroundColor: theme.colors.gray[8],
        color: theme.colors.gray[0],
        width: '80%',
        margin: 'auto',
        fontSize: theme.fontSizes.lg,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        marginTop: theme.spacing.md,
    }
}));

const SettingsForm = () => {

    const { classes } = useStyles();
    return (
        <>
            <h1 className={classes.h1}><IconSettings /> Manage Settings</h1>
            <Grid style={{ width: '80%', margin: 'auto' }}>
                <Grid.Col xs={12} sm={6}>
                    <Card withBorder>
                        <Card.Section>
                            <Text>Updated Settings</Text>
                        </Card.Section>
                    </Card>
                </Grid.Col>
                <Grid.Col xs={12} sm={6}>

                </Grid.Col>
            </Grid>
        </>
    )
};

export default SettingsForm;