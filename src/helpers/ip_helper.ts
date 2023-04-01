import geoip from 'geoip-lite';
import parsePhoneNumber from 'libphonenumber-js';

/**
 * A helper class for working with IP addresses and phone numbers.
 */
class IpHelper {
  /**
   * Returns geographical data (country, city, latitude, and longitude) based on the given IP address.
   * @param ip - The IP address to look up.
   * @returns An object containing the country, city, latitude, and longitude, if available.
   */
  public static getGeoData(ip: string): {
    country?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
  } {
    const geo = geoip.lookup(ip);
    return {
      country: geo?.country,
      city: geo?.city,
      latitude: geo?.ll?.[0],
      longitude: geo?.ll?.[1],
    };
  }

  /**
   * Returns country and national number data based on the given phone number.
   * @param phoneNumber - The phone number to parse.
   * @returns An object containing the country and national number, if available.
   */
  public static getCountryFromPhoneNumber(phoneNumber: string): {
    country?: string;
    nationalNumber?: string;
  } {
    const phoneData = parsePhoneNumber(phoneNumber);
    return {
      country: phoneData?.country,
      nationalNumber: phoneData?.nationalNumber,
    };
  }
}

export default IpHelper;
