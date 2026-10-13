package com.telekom.backend.service;

import com.telekom.backend.dto.DigitalServiceResponse;
import com.telekom.backend.dto.TariffResponse;
import com.telekom.backend.dto.TariffsPageResponse;
import com.telekom.backend.repository.DigitalServiceRepository;
import com.telekom.backend.repository.TariffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TariffService {

    private final TariffRepository tariffRepository;
    private final DigitalServiceRepository digitalServiceRepository;

    public TariffsPageResponse getTariffsPage() {
        List<TariffResponse> tariffs = tariffRepository.findAll().stream()
                .map(t -> {
                    Object internet = t.getInternetLimit() == -1 ? "Sınırsız" : t.getInternetLimit();
                    return new TariffResponse(
                            t.getId(), t.getName(), internet, t.getSmsLimit(), t.getMinutesLimit(),
                            t.getPrice(), t.getIsPremium(), t.getBadgeText(), t.getBadgeColor()
                    );
                })
                .collect(Collectors.toList());

        List<DigitalServiceResponse> services = digitalServiceRepository.findAll().stream()
                .map(s -> new DigitalServiceResponse(s.getId(), s.getName(), s.getDescription(), s.getPrice(), s.getIcon()))
                .collect(Collectors.toList());

        return new TariffsPageResponse(tariffs, services);
    }
}
