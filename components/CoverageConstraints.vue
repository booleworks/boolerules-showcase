<template>
    <td>
        <div class="coverage-constraints">
            <Chips v-model="coverageConstraints" class="add-input" />
        </div>
    </td>
    <td>
        <div class="ml-2 flex align-items-center">
            <Checkbox v-model="pairwiseCoverage" binary />
            <span class="ml-2">{{ $t('common.pairwiseCoverage') }}</span>
        </div>
    </td>
</template>

<script setup lang="ts">

const { getCoverageConstraints, getPairwiseCoverage } = useCoverageConstraints();

const coverageConstraints = getCoverageConstraints();

const pairwiseCoverage = getPairwiseCoverage();

</script>

<style scoped>
.add-input {
    width: 30rem;
}

.coverage-constraints {
    max-width: 50% !important;
}
</style>
