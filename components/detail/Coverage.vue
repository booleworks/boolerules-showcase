<template>
    <DetailHeader />
    <Button class="mt-3" :label="$t('details.btn_compute')" icon="pi pi-info-circle" @click="computeDetails()" />
    <div v-if="details.mainResult" class="mt-5">
        <!--        <h3>{{ $t('details.optimum') }}</h3>-->
        <!--        <div> {{ details.mainResult.result }}</div>-->

        <!--        <h3>{{ $t('details.used_weights') }}</h3>-->
        <DataTable :value="details.detail.detail.configurations">
            <Column field="coveredConstraints" :header="$t('details.covered_constraints')" style="vertical-align: top">
                <template #body="slotProps">
                    <div v-for="constraint of slotProps.data.coveredConstraints"
                         class="covered-constraints mb-4">{{ constraint }}</div>
                </template>
            </Column>
            <Column field="configuration" :header="$t('details.example')" style="vertical-align: top">
                <template #body="slotProps">
                    <!--                    <DetailExampleConfiguration :model="slotProps.data.configuration"/>-->
                    <div class="feature-container">
                        <span v-for="feature in slotProps.data.configuration.features">
                            <span v-if="feature.booleanValue" class="mr-1">
                                <span class="important-info feature-item">{{ feature.code }}</span>
                            </span>
                            <span v-if="feature.enumValue" class="mr-1">
                                <span class="unimportant-info feature-item">{{ feature.code }}=</span>
                                <span class="important-info feature-item">{{ feature.enumValue }}</span>
                            </span>
                            <span v-if="feature.intValue" class="mr-1">
                                <span class="unimportant-info feature-item">{{ feature.code }}=</span>
                                <span class="important-info feature-item">{{ feature.intValue }}</span>
                            </span>
                            <span v-if="feature.version" class="mr-1">
                                <span class="unimportant-info feature-item">{{ feature.code }}=</span>
                                <span class="important-info feature-item">{{ feature.version }}</span>
                            </span>
                        </span>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { type DetailRequest, type FeatureModel, type Slice } from '~/types/computations'

const appConfig = useAppConfig()
const { getDetailRequest, getJobId } = useComputation()
const details = ref({} as CoverageDetail)

type CoverageDetail = {
    mainResult: { result: number }
    detail: {
        slice: Slice,
        detail: {
            configurations: CoveringConfiguration[]
        }
    }
}

type CoveringConfiguration = {
    configuration: FeatureModel
    coveredConstraints: string[]
}

async function computeDetails() {
    const request: DetailRequest = {
        jobId: getJobId(),
        sliceSelection: getDetailRequest()
    }
    $fetch(appConfig.coverage_detail, {
        method: 'POST',
        body: request,
    }).then((res) => {
        details.value = res as CoverageDetail
    })
}
</script>

<style scoped>
.covered-constraints {
    font-family: monospace;
    font-weight: bold;
}

.feature-container {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}

.feature-item {
    padding: 2px 2px;
    border-radius: 4px;
}

.unimportant-info {
    font-family: monospace;
    color: var(--text-color-secondary);
}

.important-info {
    font-family: monospace;
    font-weight: bold;
}
</style>
