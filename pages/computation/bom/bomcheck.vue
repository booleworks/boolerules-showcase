<template>
  <div class="flex-column w-full">
    <AlgorithmHeader :header="$t('computation.bomcheck')" boolFeature enumFeature/>

    <!-- Top panels -->
    <Accordion :multiple="true" :activeIndex="openTopTabs" class="mt-5 mr-3 mb-5">
      <AccordionTab :header="$t('common.algdesc')">
        <p style="width: 60%;" v-html="$t('algo.bom.desc')"/>
      </AccordionTab>

      <AccordionTab :header="$t('slices.selection')">
        <SliceSelection defaultSliceType="SPLIT" :allowedSliceTypes="['SPLIT', 'ANY', 'ALL']"/>
      </AccordionTab>
    </Accordion>

    <!-- Computation paramters & button -->
    <ClientOnly>
      <div class="flex-column">
        <Button :label="$t('algo.bom.btn_edit_bom')" icon="pi pi-table" severity="warning" class="mb-3"
                @click="showBomDialog()"/>
        <ComputationParams additionalConstraints/>
        <div class="flex">
          <Button :label="$t('algo.bom.btn_compute_bom')" @click="compute()" icon="pi pi-desktop"
                  :disabled="!buttonActive"/>
        </div>
      </div>
    </ClientOnly>

    <Dialog v-model:visible="showBom" modal :header="$t('algo.bom.bom')" :style="{ width: '80vw' }">
      <BomDialog/>
    </Dialog>

    <!-- Result panels -->
    <Accordion :multiple="true" :activeIndex="openResultTabs" class="mt-5 mr-3">
      <AccordionTab :header="$t('common.result_status')">
        <ComputationStatusTab :status="status"/>
      </AccordionTab>

      <AccordionTab :header="$t('result.header')">
        <div v-if="status.success">
          <DataTable :value="result" rowGroupMode="rowspan" groupRowsBy="element" resizableColumns
                     columnResizeMode="expand" showGridlines sortField="element" :sortOrder="1"
                     class="p-datatable-sm mt-3 pb-3">
            <Column field="element" :header="$t('algo.bom.combination')">
              <template #body="slotProps">
                <div class="flex align-items-center gap-2">
                  <FeatureSpan :feature="slotProps.data.element.content" :showTag="true"/>
                </div>
              </template>
            </Column>
            <Column v-for="(col, index) in splitPropsListResult(result)" :key="col"
                    :header="$t('result.property') + ' ' + col">
              <template #body="bdy">
                <SlicePropertyColumn :property="bdy.data.slice.content[index]"/>
              </template>
            </Column>
          </DataTable>
        </div>
        <div v-else class="text-600 text">{{ $t('algo.nothing_computed') }}</div>
      </AccordionTab>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import {type PropertySelection} from '~/types/rulefiles'
import {type ComputationStatus, type ListComputationResponse, type ListResultModel, type Position,} from '~/types/computations'

const appConfig = useAppConfig()
const {isPresent, getId} = useCurrentRuleFile()
const {currentSliceSelection} = useCurrentSliceSelection()
const {flattenListResult, splitPropsListResult} = useResult()
const {getConstraintList} = useAdditionalConstraints()
const {getPositions} = useBom()

const buttonActive = computed(() => isPresent() && getPositions().value.length > 0)
const openTopTabs = ref([1])
const openResultTabs = ref([] as number[])
const showBom = ref(false)

const result = ref({} as BomCheckResultModel[])
const status = ref({} as ComputationStatus)

// data types
type ComputationType = 'UNIQUENESS' | 'COMPLETENESS' | 'DEAD_PV'

type BomCheckRequest = {
  ruleFileId: string
  sliceSelection: PropertySelection[]
  additionalConstraints: string[]
  computationTypes: ComputationType[]
  positions: Position[]
}
type BomCheckResultModel = ListResultModel<BomCheckAlgorithmsResult, PositionElementDO>

type BomCheckResponse = ListComputationResponse<BomCheckAlgorithmsResult, PositionElementDO>

type BomCheckAlgorithmsResult = {
  isComplete: boolean
  hasNonUniquePVs: boolean
  hasDeadPvs: boolean
}

type PositionElementDO = {
  positionId: string
  description: string
  constraint: string
  isComplete: boolean
  hasNonUniquePVs: boolean
  hasDeadPvs: boolean
}

function compute() {
  const request: BomCheckRequest = {
    ruleFileId: getId(),
    sliceSelection: currentSliceSelection(),
    additionalConstraints: getConstraintList(),
    computationTypes: ['UNIQUENESS', 'COMPLETENESS', 'DEAD_PV'],
    positions: getPositions().value
  }
  performComputation(request)
}

async function performComputation(request: BomCheckRequest) {
  $fetch(appConfig.bomcheck, {
    method: 'POST',
    body: request,
  }).then((res) => {
    const meRes = res as BomCheckResponse
    openTopTabs.value = []
    openResultTabs.value = meRes.status.success ? [1] : [0]
    status.value = meRes.status
    result.value = flattenListResult(meRes.results).filter(
        (item) => item.result,
    ) as BomCheckResultModel[]
  })
}

async function showBomDialog() {
  showBom.value = true
}

</script>

<style scoped>
.divider-text :deep(.p-divider-content) {
  background-color: var(--surface-ground) !important;
}
</style>
