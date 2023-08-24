from pprint import pprint
import json
import googlemaps
from pprint import pprint
import time
import pandas as pd
import os


class GoogleMapData:

    # read credentials from json file
    def read_json_file(self):
        directory = os.getcwd()
        directory = directory + "\\YT\\" + "config.json"
        # pprint(directory)
        # exit()
        with open(directory, 'r') as openfile:
            # Reading from json file
            json_object = json.load(openfile)

        return json_object

    def get_api_key(self):
        config_data = self.read_json_file()
        return config_data['api_key']

    def lat_lng_radius_plus_type(self):
        return [
            [48.8589384, 2.2646343, 17000, 'hotel'],
        ]

    def extract_places(self, places_result):
        gmaps = googlemaps.Client(key=self.get_api_key())
        stored_results = []

        for place in places_result['results']:
            time.sleep(1)
            # define the place id, needed to get place details. Formatted as a string.
            my_place_id = place['place_id']

            # define the fields you would liked return. Formatted as a list.
            my_fields = ['name', 'formatted_address', 'formatted_phone_number', 'geometry/location', 'type', 'website',
                         'business_status', 'international_phone_number', 'place_id']

            # make a request for the details.
            places_details = gmaps.place(place_id=my_place_id, fields=my_fields)
            pprint(places_details)

            name = places_details['result']['name']
            formatted_address = places_details['result']['formatted_address']

            if "formatted_phone_number" in places_details['result']:
                formatted_phone_number = places_details['result']['formatted_phone_number']
            else:
                formatted_phone_number = ''

            latlng = places_details['result']['geometry']['location']
            mapurl_str = "https://maps.google.com/maps?q=" + str(
                latlng['lat']) + "," + str(
                latlng['lng'])
            loc_str = "https://www.google.com/maps/search/?api=1&query=" + str(
                latlng['lat']) + "," + str(
                latlng['lng']) + "&query_place_id=" + str(places_details['result'][
                                                              'place_id'])
            location = mapurl_str
            mapinfo = loc_str
            place_type = places_details['result']['types']

            # validations
            if "website" in places_details['result']:
                website = places_details['result']['website']
            else:
                website = ''

            if "business_status" in places_details['result']:
                business_status = places_details['result']['business_status']
            else:
                business_status = ''

            if "international_phone_number" in places_details['result']:
                international_phone_number = places_details['result']['international_phone_number']
            else:
                international_phone_number = ''

            placeList = [name, formatted_address, formatted_phone_number, location, mapinfo, place_type, website,
                         business_status, international_phone_number]

            stored_results.append(placeList)
        return stored_results

    def generator_next_page(self):
        final_results = []
        lat_lng_radius_type = self.lat_lng_radius_plus_type()
        gmaps = googlemaps.Client(key=self.get_api_key())

        for first in lat_lng_radius_type:

            # latitude = first[0]
            # longitude = first[1]
            # radius = first[2]
            # type = first[3]

            params = {
                'location': "{0},{1}".format(first[0], first[1]),
                'radius': first[2],
                'open_now': False,
                'keyword': first[3]
            }

            pprint(params)

            # Loop for next page
            places_result = gmaps.places_nearby(**params)
            final_results += self.extract_places(places_result)
            # pprint(new_stored_results)
            # quit()
            if 'next_page_token' in places_result:
                while 'next_page_token' in places_result:
                    places_result = gmaps.places_nearby(**params)
                    new_stored_results = self.extract_places(places_result)
                    final_results += new_stored_results
                    if 'next_page_token' in places_result:
                        params['page_token'] = places_result['next_page_token']
                    else:
                        break

            else:
                places_result = gmaps.places_nearby(**params)
                new_stored_results = self.extract_places(places_result)

                final_results += new_stored_results

            return final_results

    def write_into_file(self):
        final_results = self.generator_next_page()
        a = pd.DataFrame(final_results,
                         columns=['Name', 'Address', 'Mobile', 'Location', 'Map Info', 'Type', 'Website',
                                  'Business Status',
                                  'International Phone'])
        cur_time = time.strftime("%Y%m%d-%H%M%S")
        writer = pd.ExcelWriter('YT\\output-file-' + cur_time + '.xlsx', engine='xlsxwriter')
        a.to_excel(writer, sheet_name='Address Details', index=False)
        writer.save()


gmpy = GoogleMapData()
pprint(gmpy.write_into_file())
