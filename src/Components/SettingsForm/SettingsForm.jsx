import { IconSettings } from "@tabler/icons";
import { createStyles, Grid, Card, Text, Switch, NumberInput, TextInput, Button } from '@mantine/core';
import { useContext, useState } from 'react';
import { SettingsContext } from '../../Context/SettingsContext'
import { When } from "react-if";
// or is it just Settings

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
    const [show, setShow] = useState(false);
    const { showComplete,
        setShowComplete,
        pageItems,
        setPageItems,
        sort,
        setSort,
        saveLocally, } = useContext(SettingsContext);
    const { classes } = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        setShow(true)
        saveLocally();
    }
    return (
        <>
            <h1 className={classes.h1}><IconSettings /> Manage Settings</h1>
            <Grid style={{ width: '80%', margin: 'auto' }}>
                <Grid.Col xs={12} sm={6}>
                    <Card withBorder p="xs">

                        <form onSubmit={handleSubmit}>
                            <Text>Updated Settings</Text>
                            <Switch label="Show Completed Todos"
                                checked={showComplete} onChange={(event) => setShowComplete(event.currentTarget.checked)} />

                            <NumberInput
                                value={pageItems}
                                label="Items Per Page"
                                onChange={(value) => setPageItems(value)}
                            />
                            <TextInput
                                mb="sm"
                                placeholder={sort}
                                onChange={(e) => setSort(e.target.value)}
                                label="Sort Keyword"
                            />

                            <Button type="submit">Show New Settings</Button>

                        </form>
                    </Card>
                </Grid.Col>
                <Grid.Col xs={12} sm={6}>
                    <When condition={show}>
                        <Card withBorder p="sm">
                            <Card.Section>
                                <Text m="xl" fontSize="xl" weight="bold">Updated Settings</Text>
                            </Card.Section>
                            <Text m='sm'>{showComplete ? 'Show' : 'Hide'} Completed Todos</Text>
                            <Text m='sm'>Items per Page {pageItems}</Text>
                            <Text m='sm'>Sort Keyword: {sort}</Text>
                        </Card>

                    </When>
                    {/* conditionally render settings changes */}
                </Grid.Col>
            </Grid>
        </>
    )
};

export default SettingsForm;