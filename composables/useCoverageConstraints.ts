import type { FileUploadUploaderEvent } from "primevue/fileupload";

const COVERAGE_CONSTRAINTS = "coverageConstraints";
const PAIRWISE_COVERAGE = "pairwiseCoverage";
const COVERAGE_CONSTRAINTS_UPLOAD_ERROR = "coverageConstraintsUploadError";

const coverageConstraints = ref(useSessionStorage(COVERAGE_CONSTRAINTS, [] as string[]));
const pairwiseCoverage = ref(useSessionStorage(PAIRWISE_COVERAGE, false))
const coverageConstraintsUploadError = ref(useSessionStorage(COVERAGE_CONSTRAINTS_UPLOAD_ERROR, null as (string | null)))

export default () => {

    const getCoverageConstraints = () => {
        return coverageConstraints
    }

    const getPairwiseCoverage = () => {
        return pairwiseCoverage
    }

    const getCoverageConstraintsUploadError = () => {
        return coverageConstraintsUploadError
    }

    const updateCoverageConstraints = (event: FileUploadUploaderEvent) => {
        coverageConstraintsUploadError.value = null
        const file = (event.files as File[])[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e) => {
            try {
                const data = e.target?.result as string;
                if (!data) {
                    coverageConstraintsUploadError.value = "File is empty or could not be read"
                } else {
                    coverageConstraints.value = data.split(/\r?\n/).filter(s => s.trim() !== "")
                }
            } catch (error) {
                coverageConstraintsUploadError.value = `Error reading file: ${error}`;
            }
        };
        reader.onerror = (e) => {
            coverageConstraintsUploadError.value = `Error reading file: ${e.target?.error}`
        }
    }

    return {
        getCoverageConstraints,
        getPairwiseCoverage,
        getCoverageConstraintsUploadError,
        updateCoverageConstraints
    };
};
