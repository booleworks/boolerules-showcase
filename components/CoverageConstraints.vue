<template>
    <td>
        <div class="coverage-constraints">
            <Chips v-model="coverageConstraints" v-tooltip.top="$t('common.coverageConstraintsTooltip')" class="add-input" />
        </div>
    </td>
    <td>
        <div class="ml-2 mb-3 flex">
            <FileUpload mode="basic" :auto="true" :chooseLabel="$t('common.coverageConstraintsUpload')" uploadIcon="pi pi-file" class="mr-3" custom-upload @uploader="updateCoverageConstraints"/>
            <Message v-if="coverageUploadError" severity="error">{{ coverageUploadError }}</Message>
        </div>
        <div class="ml-2 flex">
            <Checkbox v-model="pairwiseCoverage" binary />
            <span class="ml-2">{{ $t('common.pairwiseCoverage') }}</span>
        </div>
    </td>
</template>

<script setup lang="ts">

const { getCoverageConstraints, getPairwiseCoverage, getCoverageConstraintsUploadError, updateCoverageConstraints } = useCoverageConstraints();

const coverageConstraints = getCoverageConstraints();

const pairwiseCoverage = getPairwiseCoverage();

const coverageUploadError = getCoverageConstraintsUploadError();

</script>

<style scoped>
.add-input {
    width: 30rem;
}

.coverage-constraints {
    max-width: 50% !important;
}
</style>
