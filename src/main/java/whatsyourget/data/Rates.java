package whatsyourget.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * Created by jas on 2015-07-23.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Rates {
    private Double EUR = 1.0;
    private Double GBP = 1.0;
    private Double PLN = 1.0;

    @JsonProperty("EUR")
    public Double getEUR() {
        return EUR;
    }

    @JsonProperty("GBP")
    public Double getGBP() {
        return GBP;
    }

    @JsonProperty("PLN")
    public Double getPLN() {
        return PLN;
    }
}
