import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import colors from "../../constants/colors";
import MainText from "./MainText";

const BarChartStats = ({ data, width, height, chartConfig, title }) => {
    return (
        <View style={styles.container}>
            <MainText
                title={title}
                titleSize={20}
                alignItems="flex-start"
                marginTop={0}
            />
            <BarChart
                data={data}
                width={width}
                height={height}
                chartConfig={chartConfig}
                withInnerLines={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: colors.background,
    },
});

export default BarChartStats;
