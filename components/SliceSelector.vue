<template>
    <td class="property-name font-bold" style="padding-right: 2rem">
        {{ selection.property }}
    </td>
    <td>{{ format(slice.type) }}</td>
    <td>
        <Dropdown v-model="selection.sliceType" :options="allowedSliceTypes" :placeholder="$t('slices.slice')"
            class="md:w-8rem" />
    </td>
    <td v-if="booleanValues && booleanValues.length > 0">
        <MultiSelect v-model="selection.range.booleanValues" :options="booleanValues" :placeholder="$t('slices.filter')" />
    </td>
    <td v-if="enumValues && enumValues.length > 0">
        <div>
            <MultiSelect v-model="selection.range.enumValues" :options="enumValues" :placeholder="$t('slices.filter')" />
        </div>
    </td>
    <td v-else-if="intValues && intValues.length > 0">
        <MultiSelect v-model="selection.range.intValues" :options="intValues" :placeholder="$t('slices.filter')" :disabled="selection.range.intMin != null || selection.range.intMax != null
            " class="mr-3" />
        <InputNumber v-model="selection.range.intMin" placeholder="From" mode="decimal" showButtons id="intStart"
            :min="intStart" :max="intEnd" :disabled="selection.range.intValues && selection.range.intValues.length > 0
                " class="mr-3" />
        <InputNumber v-model="selection.range.intMax" placeholder="To" mode="decimal" showButtons :min="intStart"
            :max="intEnd" :disabled="selection.range.intValues && selection.range.intValues.length > 0
                " />
    </td>
    <td v-else-if="dateValues && dateValues.length > 0">
        <MultiSelect v-model="selection.range.dateValues" :options="dateValues" :placeholder="$t('slices.filter')"
            :disabled="selection.range.dateMin != null || selection.range.dateMax != null
                " class="mr-3" />
        <Calendar id="dateFrom" v-model="selection.range.dateMin" :placeholder="$t('slices.from')" showIcon showButtonBar
            dateFormat="yy-mm-dd" :minDate="dateStart" :maxDate="dateEnd" :disabled="selection.range.dateValues && selection.range.dateValues.length > 0
                " class="mr-3" />
        <Calendar id="dateTo" v-model="selection.range.dateMax" :placeholder="$t('slices.to')" dateFormat="yy-mm-dd"
            :minDate="dateStart" :maxDate="dateEnd" showIcon showButtonBar :disabled="selection.range.dateValues && selection.range.dateValues.length > 0
                " />
    </td>
</template>

<script setup lang="ts">
import {
    type SlicingProperty,
    type PropertySelection,
    type PropertyType,
    type SliceType,
} from "~/types/rulefiles";

const props = defineProps<{
    slice: SlicingProperty;
    selection: PropertySelection;
    defaultSliceType: SliceType;
    allowedSliceTypes: SliceType[];
}>();

const booleanValues = computed(() =>
    props.slice.range?.booleanValues?.map((v) => v.toString())
);
const enumValues = computed(() => props.slice.range?.enumValues?.toSorted());
const intValues = computed(() => props.slice.range?.intValues?.toSorted());
const intStart = computed(() => props.slice.range?.intMin);
const intEnd = computed(() => props.slice.range?.intMax);
const dateValues = computed(() => props.slice.range?.dateValues?.toSorted());
const dateStart = computed(() =>
    props.slice.range?.dateMin == null
        ? new Date("1900-01-01")
        : new Date(props.slice.range?.dateMin)
);
const dateEnd = computed(() =>
    props.slice.range?.dateMax == null
        ? new Date("2099-12-31")
        : new Date(props.slice.range?.dateMax)
);

function format(t: PropertyType) {
    if (t === "BOOLEAN") {
        return "Boolean";
    } else if (t === "INT") {
        return "Integer";
    } else if (t === "ENUM") {
        return "Enum";
    } else if (t === "DATE") {
        return "Date";
    }
}
</script>

<style scoped>
.property-name {
    font-family: monospace;
}

th,
td {
    padding-top: 10px;
    padding-right: 20px;
}
</style>
