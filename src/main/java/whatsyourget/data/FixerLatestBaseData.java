package whatsyourget.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

/**
 * Created by jas on 2015-07-23.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class FixerLatestBaseData {
    private String base;
    private String date;
    private Rates rates;
}
