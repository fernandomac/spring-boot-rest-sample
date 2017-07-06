package edu.rest;

import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.internal.scanning.PackageNamesScanner;

import javax.ws.rs.ApplicationPath;

@ApplicationPath("/api")
public class ApplicationConfiguration extends ResourceConfig {

    public ApplicationConfiguration() {
        super();

        // Create a recursive package scanner
        PackageNamesScanner resourceFinder = new PackageNamesScanner(new String[]{"edu.rest.resources"}, true);
        // Register the scanner with this Application
        registerFinder(resourceFinder);
        register(JacksonFeature.class);
    }
}
