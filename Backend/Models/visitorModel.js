import { supabaseAdmin } from '../Config/supabase.js';

export const saveVisitorData = async (visitorData) => {
    const { data, error } = await supabaseAdmin
        .from('visitors')
        .insert([{
            ip_address: visitorData.ipAddress,
            country_code: visitorData.countryCode,
            country_name: visitorData.countryName,
            region: visitorData.region,
            city: visitorData.city,
            city_lat_long: visitorData.cityLatLong,
            currencies: visitorData.currencies,
            languages: visitorData.languages,
            browser: visitorData.browser,
            browser_version: visitorData.browserVersion,
            device_brand: visitorData.deviceBrand,
            device_model: visitorData.deviceModel,
            device_family: visitorData.deviceFamily,
            os: visitorData.os,
            os_version: visitorData.osVersion,
        }]);
    if (error) throw error;
    return data;
};