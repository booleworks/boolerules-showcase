<template>
    <div class="feature-autocomplete">
        <AutoComplete v-model="selectedFeatures" option-label="uniqueName" multiple :suggestions="features"
            @complete="searchFeature" class="w-30rem" />
    </div>
</template>

<script setup lang="ts">
import { type AutoCompleteCompleteEvent } from 'primevue/autocomplete'
import type { FeatureName } from "~/types/rulefiles";

const { getFeatures } = useCurrentRuleFile()
const { getSelectedFeatures } = useFeatureSelection()

const features = ref([] as FeatureName[])
const selectedFeatures = getSelectedFeatures()

const searchFeature = (event: AutoCompleteCompleteEvent) => {
    features.value = getFeatures().filter(
        (item) => item.uniqueName.includes(event.query) &&
            !selectedFeatures.value.map((sel) => sel.uniqueName).includes(item.uniqueName),
    )
}
</script>

<style scoped>
.feature-autocomplete :deep(.p-autocomplete-token-label) {
    margin-right: 5px !important;
}

.feature-autocomplete :deep(.p-autocomplete-multiple-container) {
    width: 80rem !important
}
</style>
