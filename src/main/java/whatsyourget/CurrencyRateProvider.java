package whatsyourget;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import whatsyourget.data.FixerLatestBaseData;

import java.io.IOException;

/**
 * Created by jas on 2015-07-23.
 */
@RestController
public class CurrencyRateProvider {

    private static final Logger log = LoggerFactory.getLogger(Application.class);

    @RequestMapping(value="/latest", method=RequestMethod.GET)
    public @ResponseBody FixerLatestBaseData getLatest(@RequestParam(value="base") String currencyCode) throws IOException {
        FixerLatestBaseData fixerData = this.getFixer(currencyCode);
        log.info(fixerData.toString());
        return fixerData;
    }

    private FixerLatestBaseData getFixer(String currencyCode) {
        RestTemplate restTemplate = new RestTemplate();
        FixerLatestBaseData fixerLatestBaseData = restTemplate.getForObject("http://api.fixer.io/latest?base=" + currencyCode, FixerLatestBaseData.class);
        return fixerLatestBaseData;
    }
}
