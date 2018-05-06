<template>
    <div class="curl-tab">
        <h4>cURL</h4>
        <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="insecure-check">
            <input type="checkbox" id="insecure-check" class="mdl-checkbox__input" v-model="isInsecure">
            <span class="mdl-checkbox__label">insecure</span>
        </label>
        <pre>
            <code>
                curl{{computedInsecureStr}}-X{{ inputData.method }}{{computedHeadersStr}}-d '{{ inputData.requestBody }}' '{{ inputData.fetchUrl }}'
            </code>
        </pre>
    </div>
</template>

<script>
export default {
    props: {
        inputData: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    data: function() {
        return {
            isInsecure: false
        };
    },
    computed: {
        computedHeadersStr: function() {
            const headers = Object.keys(this.inputData.requestHeaders);
            if (headers.length > 0) {
                let returnStr = " ";
                headers.forEach(h => {
                    returnStr += `-H '${h}: ${
                        this.inputData.requestHeaders[h]
                    }' `;
                });
                return returnStr;
            }
            return " ";
        },
        computedInsecureStr: function() {
            if (this.isInsecure) {
                return " --insecure ";
            }
            return " ";
        }
    }
};
</script>


