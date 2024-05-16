const COVERAGE_CONSTRAINTS = "coverageConstraints";
const PAIRWISE_COVERAGE = "pairwiseCoverage";

const coverageConstraints = ref(useSessionStorage(COVERAGE_CONSTRAINTS, [] as string[]));
const pairwiseCoverage = ref(useSessionStorage(PAIRWISE_COVERAGE, false))

export default () => {

    const getCoverageConstraints = () => {
        return coverageConstraints
    }

    const getPairwiseCoverage = () => {
        return pairwiseCoverage
    }

    const clearCoverageConstraints = () => {
        sessionStorage.removeItem(COVERAGE_CONSTRAINTS);
        coverageConstraints.value = [];
    };

    return {getCoverageConstraints, getPairwiseCoverage, clearCoverageConstraints};
};
